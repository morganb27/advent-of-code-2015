import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Day01 {
    public static void main(String[] args) {
        try {
            int floor = 0;
            String content = Files.readString(Paths.get("input.txt"));
            for (int i = 0; i < content.length(); i++) {
                char ch = content.charAt(i);
                if (ch == '(') {
                    floor++;
                } else if (ch ==')') {
                    floor--;
                }
                if (floor == -1) {
                    System.out.println(i + 1);
                }
            }
            System.out.println(floor);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

