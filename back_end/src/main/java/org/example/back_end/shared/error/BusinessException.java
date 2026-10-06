package  org.example.back_end.shared.error;

public class BusinessException extends RuntimeException {

    public enum Kind {
        INVALID_INPUT,
        NOT_FOUND
    }

    private final Kind kind;

    private BusinessException(Kind kind, String message) {
        super(message);
        this.kind = kind;
    }

    public Kind kind() {
        return kind;
    }

    public static BusinessException invalid(String message) {
        return new BusinessException(Kind.INVALID_INPUT, message);
    }

    public static BusinessException notFound(String message) {
        return new BusinessException(Kind.NOT_FOUND, message);
    }
}