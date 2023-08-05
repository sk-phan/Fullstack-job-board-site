<template>
    <v-dialog
        v-model="isVisible"
        max-width="320"
        >
        <v-card class="px-2 py-4">
            <v-card-title class="text-h5 text-primary">
                Application received
            </v-card-title>

            <v-card-text>
                Congratulations! Your application has been successfully sent to {{ company }}. The recruiter will contact you if you are selected. Best of luck!            </v-card-text>

            <v-card-actions class="d-flex justify-center">
                <v-btn class="mr-2"  @click = "$emit('closeModal')">
                    <v-icon small>mdi-close</v-icon>
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ConfirmDialog',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        company: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isVisible: this.visible
        }
    },
    watch: {
        visible() {
            this.isVisible = this.visible
        }
    }

}
</script>

<style>

</style>