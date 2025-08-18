package com.ahamo.dummy.demo2.gateway.config;

import com.ahamo.dummy.demo2.gateway.filter.AuthenticationFilter;
import com.ahamo.dummy.demo2.gateway.filter.LoggingFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    private final AuthenticationFilter authenticationFilter;
    private final LoggingFilter loggingFilter;

    public GatewayConfig(AuthenticationFilter authenticationFilter, LoggingFilter loggingFilter) {
        this.authenticationFilter = authenticationFilter;
        this.loggingFilter = loggingFilter;
    }

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-service", r -> r
                        .path("/api/v1/auth/**")
                        .filters(f -> f
                                .filter(loggingFilter.apply(new LoggingFilter.Config()))
                                .requestRateLimiter(config -> config
                                        .setRateLimiter(redisRateLimiter())
                                        .setKeyResolver(exchange -> 
                                            exchange.getRequest().getRemoteAddress() != null ?
                                                reactor.core.publisher.Mono.just(
                                                    exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()
                                                ) : reactor.core.publisher.Mono.just("unknown")
                                        )
                                )
                        )
                        .uri("http://localhost:8080")
                )
                .route("product-service", r -> r
                        .path("/api/v1/smartphones/**")
                        .filters(f -> f
                                .filter(loggingFilter.apply(new LoggingFilter.Config()))
                        )
                        .uri("http://product-service:8080")
                )
                .route("protected-services", r -> r
                        .path("/api/v1/users/**", "/api/v1/orders/**")
                        .filters(f -> f
                                .filter(authenticationFilter.apply(new AuthenticationFilter.Config()))
                                .filter(loggingFilter.apply(new LoggingFilter.Config()))
                        )
                        .uri("http://localhost:8082")
                )
                .build();
    }

    @Bean
    public org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter redisRateLimiter() {
        return new org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter(10, 20, 1);
    }
}
