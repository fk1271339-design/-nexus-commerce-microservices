package com.ecommerce.orderservice.service;

import com.ecommerce.orderservice.dto.OrderPlacedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducerService {

    private final KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate;
    private static final String TOPIC = "order-placed";

    public void sendOrderEvent(OrderPlacedEvent event) {
        log.info("Sending order event to Kafka: {}", event);
        kafkaTemplate.send(TOPIC, event);
    }
}
