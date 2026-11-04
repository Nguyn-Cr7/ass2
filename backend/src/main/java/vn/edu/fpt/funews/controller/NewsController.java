/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.controller;

import vn.edu.fpt.funews.entity.NewsArticle;
import vn.edu.fpt.funews.service.NewsService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/news")
public class NewsController {
    private final NewsService service;

    public NewsController(NewsService s) {
        service = s;
    }

    @GetMapping("/public")
    public List<NewsArticle> publicNews() {
        return service.publicNews();
    }

    @GetMapping
    public List<NewsArticle> all(@RequestParam(required = false) String search) {
        return service.all(search);
    }

    @GetMapping("/{id}")
    public NewsArticle get(@PathVariable String id) {
        return service.get(id);
    }

    @GetMapping("/history/{accountId}")
    public List<NewsArticle> history(@PathVariable short accountId) {
        return service.history(accountId);
    }

    @PostMapping
    public NewsArticle create(@Valid @RequestBody NewsArticle n) {
        return service.save(n);
    }

    @PutMapping("/{id}")
    public NewsArticle update(@PathVariable String id, @Valid @RequestBody NewsArticle n) {
        n.setNewsArticleId(id);
        return service.save(n);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable String id) {
        service.delete(id);
        return Map.of("message", "Đã xóa bài viết");
    }
}
