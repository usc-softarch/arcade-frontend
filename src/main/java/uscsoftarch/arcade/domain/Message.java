package uscsoftarch.arcade.domain;

public class Message {
  private String body;

  public Message(String body) {
    this.body = body;
  }

  public String getMessage() {
    return body;
  }

  public void setMessage(String message) {
    this.body = body;
  }
}