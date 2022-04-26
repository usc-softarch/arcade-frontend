package uscsoftarch.arcade.macrophase;

import edu.usc.softarch.arcade.clustering.drivers.AcdcWithSmellDetection;
import edu.usc.softarch.arcade.clustering.techniques.ConcernClusteringRunner;
import edu.usc.softarch.arcade.util.ldasupport.PipeExtractor;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ArchietcturalRecovery {

    private final Path root = Paths.get("uploads");
    private final Path base = Paths.get("uploads/base");

    public ArchietcturalRecovery(){
        try {
            Files.createDirectory(base);
        } catch (IOException ignored) {
        }
    }

    void Recover(String input, Boolean isArc, Boolean isC, Boolean hasFact, String ffv){
        //input is the folder containing code multiple versions of the system
        //ffv is another folder
        try {
            if (isArc) {
                String Lang = isC? "c" : "java";
                String[] args = new String[]{input,root.toAbsolutePath().toString(),base.toAbsolutePath().toString(),Lang};
                PipeExtractor.main(args);
                List<String> phase1 = Arrays.asList(
                        "./ext-tools/mallet-2.0.7/bin/mallet",
                        "import-dir",
                        "--input", input,
                        "---remove-stopwords", "TRUE",
                        "--keep-sequence", "TRUE",
                        "upload/topicmodel.data"
                );
                ProcessBuilder process1 = new ProcessBuilder(phase1);
                process1.inheritIO();
                try {
                    Process p = process1.start();
                    p.waitFor();
                } catch (IOException ioe){
                    ioe.printStackTrace();
                    throw new RuntimeException("Unable to start process");
                } catch (InterruptedException ie){
                    throw new RuntimeException("Process is Interrupted");
                }
                List<String> phase2 = Arrays.asList("./ext-tools/mallet-2.0.7/bin/mallet",
                        "train-topics",
                        "--input", "upload/topicmodel.data",
                        "--inferencer-filename", "infer.mallet",
                        "--num-top-words", "50",
                        "--num-topics", "100",
                        "--num-threads", "3",
                        "--num-iterations", "100",
                        "--doc-topics-threshold", "0.1");
                ProcessBuilder process2 = new ProcessBuilder(phase2);
                process2.inheritIO();
                try {
                    Process p = process2.start();
                    p.waitFor();
                } catch (IOException ioe){
                    ioe.printStackTrace();
                    throw new RuntimeException("Unable to start process");
                } catch (InterruptedException ie){
                    throw new RuntimeException("Process is Interrupted");
                }
                String rootdir=base.getRoot().toString();
                if (!hasFact){
                    ffv=new FactExtraction().run(input,isC,"");
                }
                ConcernClusteringRunner.main(new String[]{
                        Lang,
                        "uploads",
                        rootdir,
                        Paths.get(ffv).toAbsolutePath().toString(),
                        "uploads"
                });
            } else {
                String lang = isC? "c" : "java";
                AcdcWithSmellDetection.main(new String[]{input,root.toString(),"",lang});
            }
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Unable to run Arch recovery!");
        }
    }
}
