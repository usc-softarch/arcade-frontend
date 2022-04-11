package uscsoftarch.arcade.macrophase;

import edu.usc.softarch.arcade.clustering.acdc.ACDC;
import edu.usc.softarch.arcade.clustering.techniques.ConcernClusteringRunner;
import edu.usc.softarch.arcade.util.ldasupport.PipeExtractor;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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
                Runtime rt= Runtime.getRuntime();
                Process mallet1 = rt.exec(new String[]{
                        "./ext-tools/mallet-2.0.7/bin/mallet",
                        "import-dir",
                        "--input", input,
                        "---remove-stopwords", "TRUE",
                        "--keep-sequence", "TRUE",
                        "ArchRecovery/topicmodel.data"
                });
                Process mallet2 = rt.exec(new String[]{
                        "./ext-tools/mallet-2.0.7/bin/mallet",
                        "train-topics",
                        "--input", "ArchRecovery/topicmodel.data",
                        "--inferencer-filename", "infer.mallet",
                        "--num-top-words", "50",
                        "--num-topics", "100",
                        "--num-threads", "3",
                        "--num-iterations", "100",
                        "--doc-topics-threshold", "0.1"
                });
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
