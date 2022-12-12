package com.example.apigw.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public RouteLocator myRoute(RouteLocatorBuilder builder)
    {
        return builder.routes()
                .route(p -> p.path("/authservice/**").uri("http://localhost:8085/*"))
                .route(p -> p.path("/api/v1/**").uri("http://localhost:65100/*"))
                .route(p -> p.path("/api/v2/**").uri("http://localhost:9000/*"))
                .build();
    }
}
