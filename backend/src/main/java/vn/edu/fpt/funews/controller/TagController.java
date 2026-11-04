/* Author: Khôi Nguyên */
package vn.edu.fpt.funews.controller;

import vn.edu.fpt.funews.entity.Tag;
import vn.edu.fpt.funews.repository.TagRepository;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    private final TagRepository repo;

    public TagController(TagRepository r) {
        repo = r;
    }

    @GetMapping
    public List<Tag> all() {
        return repo.findAll();
    }

    @PostMapping
    public Tag create(@Valid @RequestBody Tag t) {
        // TagID in the assignment SQL is not IDENTITY, so generate the next ID on the server.
        if (t.getTagId() == null || t.getTagId() <= 0) {
            int next = repo.findAll().stream().map(Tag::getTagId).filter(Objects::nonNull)
                    .mapToInt(Integer::intValue).max().orElse(0) + 1;
            t.setTagId(next);
        }
        return repo.save(t);
    }

    @PutMapping("/{id}")
    public Tag update(@PathVariable int id, @Valid @RequestBody Tag t) {
        t.setTagId(id);
        return repo.save(t);
    }
}
