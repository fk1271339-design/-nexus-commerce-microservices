package com.ecommerce.orderservice.client;

import com.ecommerce.orderservice.dto.ProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service", url = "http://localhost:8081/api/products")
public interface ProductClient {

    @GetMapping("/{id}")
    ProductDTO getProductById(@PathVariable("id") Long id);
}
