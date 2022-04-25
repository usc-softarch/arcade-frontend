package uscsoftarch.arcade.macrophase;

import edu.usc.softarch.arcade.antipattern.detection.ArchSmellDetector;

import java.io.IOException;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class SmellDetection {

    private final Path root = Paths.get("Smells");

    public SmellDetection(){
        try {
            Files.createDirectory(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for smell detection!");
        }
    }

    public void Run(String dependencyRSF,String clusterRSF, String serFiles, String mallet, Boolean isArc){
        String isArc_s= isArc? "true" : "false";
        try{
            PrintStream OriginalOut = System.out;
            PrintStream fileOut = new PrintStream("./Metrics/smells.txt");

            ArchSmellDetector.main(new String[]{
                    dependencyRSF,clusterRSF,serFiles,mallet,isArc_s
            });

            System.setOut(OriginalOut);
        } catch (IOException e) {
            throw new RuntimeException("Unable to run Smell Detection!");
        }
    }
}
