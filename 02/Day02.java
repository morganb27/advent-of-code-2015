import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Day02 {
    public static void main(String[] args) {
        try {
            int total = 0;
            String content = Files.readString(Paths.get("input.txt"));
            String[] lines = content.split("\\R");
            for (int i = 0; i < lines.length; i++) {
                String[] dimensions = lines[i].split("x");
                int length = Integer.parseInt(dimensions[0]);
                int width = Integer.parseInt(dimensions[1]);
                int height = Integer.parseInt(dimensions[2]);
                int areaOfSmallestSide = Math.min(Math.min(length * width, width * height), length * height);

                total += (2 * length * width) + (2 * width * height) + (2 * length * height) + areaOfSmallestSide;
            }
            System.out.println(total);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

