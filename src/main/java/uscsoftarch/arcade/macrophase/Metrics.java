package uscsoftarch.arcade.macrophase;

import edu.usc.softarch.arcade.decay.BatchDecayMetricsAnalyzer;
import edu.usc.softarch.arcade.metrics.BatchSystemEvo;

import java.io.FileNotFoundException;

public class Metrics {
    public Metrics(){
    }

    public void Run(String method, String dependencyRSF, String clusterRSF){
        try {
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
            //All the output is in System.out, I am not sure how to handle that
        } catch (FileNotFoundException fnfe){
            throw new RuntimeException("Unable to run Metrics!");
        }
    }
}
