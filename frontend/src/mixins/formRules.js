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
            }
        }
    }
}