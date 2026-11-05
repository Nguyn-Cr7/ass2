/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.controller;

import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Xử lý tập trung các ngoại lệ trong toàn bộ ứng dụng và trả về mã lỗi HTTP phù hợp.
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    // Lỗi 404: Không tìm thấy dữ liệu (NoSuchElementException)
    @ExceptionHandler(NoSuchElementException.class)
    ResponseEntity<?> notFound(RuntimeException e) {
        return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
    }

    // Lỗi 400: Dữ liệu gửi lên không hợp lệ (IllegalArgumentException)
    @ExceptionHandler(IllegalArgumentException.class)
    ResponseEntity<?> badRequest(RuntimeException e) {
        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }

    // Lỗi 409: Xung đột nghiệp vụ, ví dụ xóa tài khoản/danh mục đã có bài viết (IllegalStateException)
    @ExceptionHandler(IllegalStateException.class)
    ResponseEntity<?> conflict(RuntimeException e) {
        return ResponseEntity.status(409).body(Map.of("error", e.getMessage()));
    }

    // Lỗi 400: Vi phạm validation của Jakarta Validation (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<?> validation(MethodArgumentNotValidException e) {
        Map<String, String> errors = new LinkedHashMap<>();
        e.getBindingResult().getFieldErrors().forEach(x -> errors.put(x.getField(), x.getDefaultMessage()));
        return ResponseEntity.badRequest().body(Map.of("error", "validation_failed", "fields", errors));
    }
}
