package com.ahamo.dummy.demo2.gateway.filter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.net.URI;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationFilterTest {

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

    private AuthenticationFilter authenticationFilter;

    @BeforeEach
    void setUp() {
        authenticationFilter = new AuthenticationFilter();
        ReflectionTestUtils.setField(authenticationFilter, "jwtSecret", "dGVzdFNlY3JldEtleUZvckpXVFRva2VuVGVzdGluZ1B1cnBvc2VzMTIzNDU2Nzg5MA==");
    }

    @Test
    void shouldAllowPublicEndpoints() {
        when(exchange.getRequest()).thenReturn(request);
        when(request.getURI()).thenReturn(URI.create("/api/v1/auth/login"));
        when(chain.filter(exchange)).thenReturn(Mono.empty());

        Mono<Void> result = authenticationFilter.apply(new AuthenticationFilter.Config())
                .filter(exchange, chain);

        StepVerifier.create(result)
                .verifyComplete();
        
        verify(chain).filter(exchange);
    }

    @Test
    void shouldAllowHealthCheckEndpoints() {
        when(exchange.getRequest()).thenReturn(request);
        when(request.getURI()).thenReturn(URI.create("/actuator/health"));
        when(chain.filter(exchange)).thenReturn(Mono.empty());

        Mono<Void> result = authenticationFilter.apply(new AuthenticationFilter.Config())
                .filter(exchange, chain);

        StepVerifier.create(result)
                .verifyComplete();
        
        verify(chain).filter(exchange);
    }

    @Test
    void shouldRejectRequestWithoutAuthorizationHeader() {
        when(exchange.getRequest()).thenReturn(request);
        when(exchange.getResponse()).thenReturn(response);
        when(request.getURI()).thenReturn(URI.create("/api/v1/users"));
        when(request.getHeaders()).thenReturn(headers);
        when(headers.getFirst(HttpHeaders.AUTHORIZATION)).thenReturn(null);
        when(response.setStatusCode(HttpStatus.UNAUTHORIZED)).thenReturn(true);
        when(response.getHeaders()).thenReturn(headers);
        
        org.springframework.core.io.buffer.DataBufferFactory bufferFactory = mock(org.springframework.core.io.buffer.DataBufferFactory.class);
        org.springframework.core.io.buffer.DataBuffer dataBuffer = mock(org.springframework.core.io.buffer.DataBuffer.class);
        when(response.bufferFactory()).thenReturn(bufferFactory);
        when(bufferFactory.wrap(any(byte[].class))).thenReturn(dataBuffer);
        when(response.writeWith(any())).thenReturn(Mono.empty());

        Mono<Void> result = authenticationFilter.apply(new AuthenticationFilter.Config())
                .filter(exchange, chain);

        StepVerifier.create(result)
                .verifyComplete();
        
        verify(response).setStatusCode(HttpStatus.UNAUTHORIZED);
        verify(chain, never()).filter(exchange);
    }

    @Test
    void shouldRejectRequestWithInvalidAuthorizationHeader() {
        when(exchange.getRequest()).thenReturn(request);
        when(exchange.getResponse()).thenReturn(response);
        when(request.getURI()).thenReturn(URI.create("/api/v1/users"));
        when(request.getHeaders()).thenReturn(headers);
        when(headers.getFirst(HttpHeaders.AUTHORIZATION)).thenReturn("Invalid header");
        when(response.setStatusCode(HttpStatus.UNAUTHORIZED)).thenReturn(true);
        when(response.getHeaders()).thenReturn(headers);
        
        org.springframework.core.io.buffer.DataBufferFactory bufferFactory = mock(org.springframework.core.io.buffer.DataBufferFactory.class);
        org.springframework.core.io.buffer.DataBuffer dataBuffer = mock(org.springframework.core.io.buffer.DataBuffer.class);
        when(response.bufferFactory()).thenReturn(bufferFactory);
        when(bufferFactory.wrap(any(byte[].class))).thenReturn(dataBuffer);
        when(response.writeWith(any())).thenReturn(Mono.empty());

        Mono<Void> result = authenticationFilter.apply(new AuthenticationFilter.Config())
                .filter(exchange, chain);

        StepVerifier.create(result)
                .verifyComplete();
        
        verify(response).setStatusCode(HttpStatus.UNAUTHORIZED);
        verify(chain, never()).filter(exchange);
    }
}
