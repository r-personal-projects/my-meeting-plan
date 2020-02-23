package one.rubeen.backend.meetingplanner.authentication.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class UserController {

    @GetMapping("/user/me")
    public final Principal getUser(final Principal principal) {
        return principal;
    }
}
