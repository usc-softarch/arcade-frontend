package uscsoftarch.arcade.macrophase;

import edu.usc.softarch.arcade.antipattern.detection.ArchSmellDetector;
import edu.usc.softarch.arcade.antipattern.detection.interfacebased.DependencyFinderProcessing;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class SmellDetection {

    private final Path root = Paths.get("uploads");

    public SmellDetection(){
    }

    public String RunArch(String dependencyRSF, String clusterRSF, String serFiles, String mallet, String lang, Boolean isArc) {
        //dependency, cluster, ser all need to be seperate directories holding corresponding files
        String isArc_s = isArc ? "true" : "false";
        try {
            PrintStream OriginalOut = System.out;
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            System.setOut(new PrintStream(baos));

            ArchSmellDetector.main(new String[]{
                    dependencyRSF, clusterRSF, serFiles, lang, mallet, isArc_s
            });

            System.setOut(OriginalOut);
            return baos.toString();
        } catch (IOException e) {
            throw new RuntimeException("Unable to run Smell Detection!");
        }
    }

    public void RunDecay(Boolean isBatch, String gitlog, String input, String pkg, String clusterRSF) {
        //gitlog is .log downloaded from github
        //input is the folder that holds sorce code for multiple versions of the target system
        //pkg is package name
        //it also need cluster files
        //Generates a file 'results.csv' in upload folder

        List<String> Commands1 = new ArrayList<>();
        Commands1.add("java");
        Commands1.add("-jar");
        Commands1.add("./ext-tools/code-maat/code-maat-1.0-SNAPSHOT-standalone.jar");
        Commands1.add("-l");
        Commands1.add(gitlog);
        Commands1.add("-c");
        Commands1.add("git2");
        Commands1.add("-o");
        Commands1.add("coupling");
        Commands1.add(">");
        Commands1.add("project.csv");
        ProcessBuilder pb = new ProcessBuilder(Commands1);
        pb.inheritIO();

        try {
            Process p = pb.start();
            p.waitFor();
        } catch(Exception e) {
            e.printStackTrace();
        }

        List<String> Commands2 = new ArrayList<>();
        char fs = File.pathSeparatorChar;
        Commands2.add("ext-tools" + fs + "apache-ant-1.9.6" + fs + "bin"
                + fs + "ant.bat");
        Commands2.add("-f");
        Commands2.add("ext-tools" + fs + "pmd-bin-5.3.2" + fs + "cpd.xml");
        Commands2.add("cpd");
        Commands2.add("-Din=" + input);
        Commands2.add("-Dout=" + "clone/clone.xml");

        pb = new ProcessBuilder(Commands2);
        pb.inheritIO();

        try {
            Process p = pb.start();
            p.waitFor();
        } catch(Exception e) {
            e.printStackTrace();
        }

        List<String> Commands3 = new ArrayList<>();
        Commands3.add("ext-tools" + fs + "DependencyFinder" + fs + "bin" + fs + "DependencyExtractor.bat");
        Commands3.add("-xml");
        Commands3.add("-out");
        Commands3.add(input);
        Commands3.add("dependencies/lib");

        pb = new ProcessBuilder(Commands3);
        pb.inheritIO();

        try {
            Process p = pb.start();
            p.waitFor();
        } catch(Exception e) {
            e.printStackTrace();
        }

        try {
            DependencyFinderProcessing.main(new String[]{
                    input,
                    clusterRSF,
                    "dependencies/lib",
                    "clone/",
                    "project.csv",
                    pkg,
                    "uploads/result.csv"
            });
        } catch (IOException ignored){}
        catch (Exception e) {e.printStackTrace();}
    }
}
