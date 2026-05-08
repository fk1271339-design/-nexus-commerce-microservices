package com.ecommerce.productservice.service;

import com.ecommerce.productservice.dto.OrderPlacedEvent;
import com.ecommerce.productservice.entity.Product;
import com.ecommerce.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.CacheEvict;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumerService {

    private final ProductRepository productRepository;

    @KafkaListener(topics = "order-placed", groupId = "product-group")
    @CacheEvict(value = "products", allEntries = true)
    public void consumeOrderEvent(OrderPlacedEvent event) {
        log.info("Consumed order event from Kafka: {}", event);
        
        productRepository.findById(event.getProductId()).ifPresent(product -> {
            log.info("Updating stock for product: {}", product.getName());
            product.setStock(product.getStock() - event.getQuantity());
            productRepository.save(product);
            log.info("Updated stock for product: {}. New stock: {}", product.getName(), product.getStock());
        });
    }
}
