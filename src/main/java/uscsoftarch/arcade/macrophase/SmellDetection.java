package uscsoftarch.arcade.macrophase;

import edu.usc.softarch.arcade.antipattern.detection.ArchSmellDetector;

import java.io.IOException;

public class SmellDetection {
    public SmellDetection(){
    }

    public void Run(String dependencyRSF,String clusterRSF, String serFiles, String mallet, Boolean isArc){
        String isArc_s= isArc? "true" : "false";
        try{
            ArchSmellDetector.main(new String[]{
                    dependencyRSF,clusterRSF,serFiles,mallet,isArc_s
            });
            //All the output is in System.out, I am not sure how to give them back
        } catch (IOException e) {
            throw new RuntimeException("Unable to run Smell Detection!");
        }
    }
}
