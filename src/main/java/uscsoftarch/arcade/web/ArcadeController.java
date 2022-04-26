package uscsoftarch.arcade.web;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import uscsoftarch.arcade.domain.Message;
import uscsoftarch.arcade.macrophase.*;

@Controller
@CrossOrigin("localhost:8080")
public class ArcadeController {

    @GetMapping("metrics")
    public ResponseEntity<String> Metrics(@RequestParam String method,
                                          @RequestParam(required = false) String clu, @RequestParam(required = false) String dep){
        String result = new Metrics().Run(method,"","");
        return ResponseEntity.ok().body(result);
    }
}
