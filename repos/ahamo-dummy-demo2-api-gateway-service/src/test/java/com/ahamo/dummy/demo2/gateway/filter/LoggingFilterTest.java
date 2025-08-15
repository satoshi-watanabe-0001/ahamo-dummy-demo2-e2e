package com.ahamo.dummy.demo2.gateway.filter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.net.InetSocketAddress;
import java.net.URI;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LoggingFilterTest {

    @Mock
    private ServerWebExchange exchange;
    
    @Mock
    private ServerHttpRequest request;
    
    @Mock
    private ServerHttpResponse response;
    
    @Mock
    private GatewayFilterChain chain;
    
    @Mock
    private HttpHeaders headers;

    private LoggingFilter loggingFilter;

    @BeforeEach
    void setUp() {
        loggingFilter = new LoggingFilter();
        
        when(exchange.getRequest()).thenReturn(request);
        when(exchange.getResponse()).thenReturn(response);
        when(request.getHeaders()).thenReturn(headers);
    }

    @Test
    void shouldLogRequestAndResponse() {
        when(request.getMethod()).thenReturn(HttpMethod.GET);
        when(request.getURI()).thenReturn(URI.create("/api/v1/users"));
        when(request.getRemoteAddress()).thenReturn(new InetSocketAddress("127.0.0.1", 8080));
        when(headers.getFirst("X-Request-ID")).thenReturn("test-request-id");
        when(response.getStatusCode()).thenReturn(HttpStatus.OK);
        when(chain.filter(exchange)).thenReturn(Mono.empty());

        Mono<Void> result = loggingFilter.apply(new LoggingFilter.Config())
                .filter(exchange, chain);

        StepVerifier.create(result)
                .verifyComplete();
        
        verify(chain).filter(exchange);
    }

    @Test
    void shouldGenerateRequestIdWhenNotProvided() {
        when(request.getMethod()).thenReturn(HttpMethod.POST);
        when(request.getURI()).thenReturn(URI.create("/api/v1/auth/login"));
        when(request.getRemoteAddress()).thenReturn(new InetSocketAddress("192.168.1.1", 8080));
        when(headers.getFirst("X-Request-ID")).thenReturn(null);
        when(response.getStatusCode()).thenReturn(HttpStatus.OK);
        when(chain.filter(exchange)).thenReturn(Mono.empty());

        Mono<Void> result = loggingFilter.apply(new LoggingFilter.Config())
                .filter(exchange, chain);

        StepVerifier.create(result)
                .verifyComplete();
        
        verify(chain).filter(exchange);
    }
}
