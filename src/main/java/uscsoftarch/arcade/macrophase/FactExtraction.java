package uscsoftarch.arcade.macrophase;

import edu.usc.softarch.arcade.facts.driver.CSourceToDepsBuilder;
import edu.usc.softarch.arcade.facts.driver.JavaSourceToDepsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FactExtraction {

    private final Path root = Paths.get("FactExtraction");
    private final Path rsf = Paths.get("FactExtraction/rsf");
    private final Path ffv = Paths.get("FactExtraction/fsv");

    public FactExtraction(){
        try {
            Files.createDirectory(root);
            Files.createDirectory(rsf);
            Files.createDirectory(ffv);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for fact extraction!");
        }
    }

    public void run(String input, Boolean isC){
        try {
            if (isC) {
                new CSourceToDepsBuilder().build(input, rsf.toString(), ffv.toString());
            } else {
                new JavaSourceToDepsBuilder().build(input,rsf.toString(),ffv.toString());
            }
        } catch (IOException e){
            throw new RuntimeException("Unable to read files!");
        }
    }
}
