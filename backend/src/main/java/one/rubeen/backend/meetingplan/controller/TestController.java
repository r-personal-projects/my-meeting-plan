package one.rubeen.backend.meetingplan.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping
public class TestController {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @RequestMapping(method = RequestMethod.GET)
    public final ResponseEntity<String> getTest() {
        log.debug("Test-Endpoint called");
        return ResponseEntity.ok("Test");
    }
}
