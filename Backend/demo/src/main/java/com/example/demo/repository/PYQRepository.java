package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.PYQ;

@Repository
public interface PYQRepository extends JpaRepository<PYQ, Long> {

    List<PYQ> findBySemesterAndTypeAndCourse(String semester, String type, String course);
}
