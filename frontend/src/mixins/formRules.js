export default {
    data() {
        return {
            rules: {
                required:  value => !!value || 'Required.',
                email:  (value) => {
                    return (
                        !value ||
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            value
                        ) ||
                        "Please enter a valid email address"
                    );
                },
                password:  value =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
                'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters',
            }
        }
    }
}