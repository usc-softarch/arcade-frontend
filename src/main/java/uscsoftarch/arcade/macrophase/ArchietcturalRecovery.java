package uscsoftarch.arcade.macrophase;

import edu.usc.softarch.arcade.clustering.acdc.ACDC;
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
    private final Path root = Paths.get("ArchRecovery");
    private final Path base = Paths.get("ArchRecovery/base");

    public ArchietcturalRecovery(){
        try {
            Files.createDirectory(root);
            Files.createDirectory(base);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for Arch recovery!");
        }
    }

    void Recover(String input, Boolean isArc, Boolean isC, Boolean hasFact){
        try {
            if (isArc) {
                String[] args = new String[]{input};
                PipeExtractor.main(args);
                List<String> phase1 = Arrays.asList(
                        "./ext-tools/mallet-2.0.7/bin/mallet",
                        "import-dir",
                        "--input", input,
                        "---remove-stopwords", "TRUE",
                        "--keep-sequence", "TRUE",
                        "ArchRecovery/topicmodel.data"
                );
                ProcessBuilder process1 = new ProcessBuilder(phase1);
                process1.inheritIO();
                try {
                    Process p = process1.start();
                    p.waitFor();
                } catch (IOException ioe){
                    throw new RuntimeException("Unable to start process");
                } catch (InterruptedException ie){
                    throw new RuntimeException("Process is Interrupted");
                }
                List<String> phase2 = Arrays.asList("./ext-tools/mallet-2.0.7/bin/mallet",
                        "train-topics",
                        "--input", "ArchRecovery/topicmodel.data",
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
                    throw new RuntimeException("Unable to start process");
                } catch (InterruptedException ie){
                    throw new RuntimeException("Process is Interrupted");
                }
                String Lang = isC? "c" : "java";
                String rootdir=root.getRoot().toString();
                if (!hasFact){
                    new FactExtraction().run(input,isC);
                }
                ConcernClusteringRunner.main(new String[]{
                        Lang,
                        "ArchRecovery",
                        rootdir,
                        "FactExtraction/ffv",
                        "ArchRecovery"
                });
            } else {
                ACDC.run(input,root.toString());
            }
        } catch (Exception e){
            throw new RuntimeException("Unable to run Arch recovery!");
        }
    }
}
