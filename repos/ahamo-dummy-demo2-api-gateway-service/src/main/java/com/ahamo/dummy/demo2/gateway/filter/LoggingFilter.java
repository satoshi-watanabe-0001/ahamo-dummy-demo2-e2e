package com.ahamo.dummy.demo2.gateway.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Component
public class LoggingFilter extends AbstractGatewayFilterFactory<LoggingFilter.Config> {

    public LoggingFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();
            
            final String requestId = request.getHeaders().getFirst("X-Request-ID") != null 
                    ? request.getHeaders().getFirst("X-Request-ID") 
                    : java.util.UUID.randomUUID().toString();
            
            long startTime = System.currentTimeMillis();
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            
            log.info("Gateway Request - ID: {}, Method: {}, URI: {}, Remote: {}, Timestamp: {}", 
                    requestId,
                    request.getMethod(),
                    request.getURI(),
                    request.getRemoteAddress(),
                    timestamp);

            return chain.filter(exchange).then(
                Mono.fromRunnable(() -> {
                    long duration = System.currentTimeMillis() - startTime;
                    log.info("Gateway Response - ID: {}, Status: {}, Duration: {}ms", 
                            requestId,
                            response.getStatusCode(),
                            duration);
                })
            );
        };
    }

    public static class Config {
    }
}
