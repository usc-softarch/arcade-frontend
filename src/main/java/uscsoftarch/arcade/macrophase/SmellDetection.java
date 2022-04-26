package uscsoftarch.arcade.macrophase;

import edu.usc.softarch.arcade.antipattern.detection.ArchSmellDetector;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class SmellDetection {

    private final Path root = Paths.get("uploads");

    public SmellDetection(){
    }

    public String Run(String dependencyRSF,String clusterRSF, String serFiles, String mallet, String lang, Boolean isArc){
        String isArc_s= isArc? "true" : "false";
        try{
            PrintStream OriginalOut = System.out;
            ByteArrayOutputStream baos=new ByteArrayOutputStream();
            System.setOut(new PrintStream(baos));

            ArchSmellDetector.main(new String[]{
                    dependencyRSF,clusterRSF,serFiles,lang,mallet,isArc_s
            });

            System.setOut(OriginalOut);
            return baos.toString();
        } catch (IOException e) {
            throw new RuntimeException("Unable to run Smell Detection!");
        }
    }
}
