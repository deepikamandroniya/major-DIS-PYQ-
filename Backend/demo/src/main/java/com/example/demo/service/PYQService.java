package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.example.demo.model.PYQ;
import com.example.demo.repository.PYQRepository;

@Service
public class PYQService {

    @Autowired
    private PYQRepository pyqRepository;

    public List<PYQ> findBySemesterTypeAndCourse(String semester, String type, String course) {
        return pyqRepository.findBySemesterAndTypeAndCourse(semester, type, course);
    }
}
