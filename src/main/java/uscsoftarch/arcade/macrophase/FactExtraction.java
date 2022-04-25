package uscsoftarch.arcade.macrophase;

import edu.usc.softarch.arcade.facts.driver.CSourceToDepsBuilder;
import edu.usc.softarch.arcade.facts.driver.JavaSourceToDepsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FactExtraction {

    private final Path upload=Paths.get("uploads");

    public FactExtraction(){
    }

    public String run(String input, Boolean isC, String prefix) throws IOException{
            Path p=Paths.get(input);
            String i=p.toAbsolutePath().toString();
            String dep=upload.toAbsolutePath().toString()+"/"+p.getFileName()+".rsf";
            String ffv=upload.toAbsolutePath().toString()+"/"+p.getFileName()+".ffv";
            if (isC) {
                new CSourceToDepsBuilder().build(i, dep, ffv);
            } else {
                new JavaSourceToDepsBuilder().build(i,dep,ffv,prefix);
            }
            return ffv;
    }
}
