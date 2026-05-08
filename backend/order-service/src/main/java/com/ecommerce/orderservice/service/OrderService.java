package com.ecommerce.orderservice.service;

import com.ecommerce.orderservice.client.ProductClient;
import com.ecommerce.orderservice.dto.OrderRequest;
import com.ecommerce.orderservice.dto.OrderResponse;
import com.ecommerce.orderservice.dto.ProductDTO;
import com.ecommerce.orderservice.entity.Order;
import com.ecommerce.orderservice.entity.PaymentStatus;
import com.ecommerce.orderservice.exception.CustomException;
import com.ecommerce.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductClient productClient;
    private final KafkaProducerService kafkaProducerService;

    public OrderResponse createOrder(OrderRequest request) {
        // 1. Get Product info from Product Service
        ProductDTO product;
        try {
            product = productClient.getProductById(request.getProductId());
        } catch (Exception e) {
            throw new CustomException("Product not found or Product Service is down", HttpStatus.NOT_FOUND);
        }

        if (product.getStock() < request.getQuantity()) {
            throw new CustomException("Not enough stock", HttpStatus.BAD_REQUEST);
        }

        // 2. Calculate Total Price
        BigDecimal totalPrice = product.getPrice().multiply(BigDecimal.valueOf(request.getQuantity()));

        // 3. Create Order
        Order order = Order.builder()
                .userId(request.getUserId())
                .productId(request.getProductId())
                .quantity(request.getQuantity())
                .totalPrice(totalPrice)
                .paymentStatus(PaymentStatus.SUCCESS) // Simulated payment
                .orderDate(LocalDateTime.now())
                .build();

        Order savedOrder = orderRepository.save(order);

        // 4. Send event to Kafka to update stock
        kafkaProducerService.sendOrderEvent(new com.ecommerce.orderservice.dto.OrderPlacedEvent(
                savedOrder.getProductId(),
                savedOrder.getQuantity()
        ));

        return mapToResponse(savedOrder);
    }

    public List<OrderResponse> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private OrderResponse mapToResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .productId(order.getProductId())
                .quantity(order.getQuantity())
                .totalPrice(order.getTotalPrice())
                .paymentStatus(order.getPaymentStatus())
                .orderDate(order.getOrderDate())
                .build();
    }
}
