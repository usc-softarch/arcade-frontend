package uscsoftarch.arcade;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import javax.annotation.Resource;
import uscsoftarch.arcade.service.FileStorageService;

@SpringBootApplication
public class ArcadeApplication implements CommandLineRunner {
	@Resource
	FileStorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(ArcadeApplication.class, args);
	}

	@Override
	public void run(String... arg) throws Exception {
		storageService.deleteAll();
		storageService.init();
	}
}
