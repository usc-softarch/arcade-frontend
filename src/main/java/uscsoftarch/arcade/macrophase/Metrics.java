package uscsoftarch.arcade.macrophase;

import edu.usc.softarch.arcade.decay.BatchDecayMetricsAnalyzer;
import edu.usc.softarch.arcade.metrics.BatchSystemEvo;

import java.io.ByteArrayOutputStream;
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

    public String Run(String method, String dependencyRSF, String clusterRSF){
        //dependency, cluster need to be seperate directories holding the correspoinding files
        //(They are now ignored and just set to the /uploads folder)
        try {
            PrintStream OriginalOut = System.out;
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            dependencyRSF = root.toAbsolutePath().toString();
            clusterRSF = root.toAbsolutePath().toString();
            System.setOut(new PrintStream(baos));
            if (method.equals("a2a")) {
                BatchSystemEvo.main(new String[]{
                        clusterRSF
                });
            } else if (method.equals("batch")){
                BatchDecayMetricsAnalyzer.main(new String[]{
                        dependencyRSF,
                        clusterRSF
                });
            }

            System.setOut(OriginalOut);
            return baos.toString();
        } catch (FileNotFoundException fnfe){
            throw new RuntimeException("Unable to run Metrics!");
        }
    }
}
