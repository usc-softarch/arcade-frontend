package uscsoftarch.arcade.macrophase;

import edu.usc.softarch.arcade.decay.BatchDecayMetricsAnalyzer;
import edu.usc.softarch.arcade.metrics.BatchSystemEvo;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Metrics {

    private final Path root = Paths.get("uploads");

    public Metrics(){
    }

    public void Run(String method, String dependencyRSF, String clusterRSF){
        try {
            PrintStream OriginalOut = System.out;
            PrintStream fileOut = new PrintStream(root.toAbsolutePath()+"/metrics.txt");

            System.setOut(fileOut);
            if (method.equals("A2a")) {
                BatchSystemEvo.main(new String[]{
                        clusterRSF
                });
            } else {
                BatchDecayMetricsAnalyzer.main(new String[]{
                        dependencyRSF,
                        clusterRSF
                });
            }

            System.setOut(OriginalOut);
        } catch (FileNotFoundException fnfe){
            throw new RuntimeException("Unable to run Metrics!");
        }
    }
}
