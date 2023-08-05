<template>
    <v-dialog
      v-model="isVisible"
      max-width="320"
    >
      <v-card class="px-2 py-4">
        <v-card-title class="text-h5">
            Delete job
        </v-card-title>

        <v-card-text>
            Are you sure you want to delete this job? You can't undo this action
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="mr-2"  @click = "$emit('confirm', false)">
                <v-icon small>mdi-close</v-icon>
                Cancel
            </v-btn>
            <v-btn color="error" @click = "$emit('confirm', true)">
                <v-icon small>mdi-delete-outline</v-icon>
                Delete job
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DeleteJobDialog",
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        name: {
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
            this.isVisible = this.visible;
        }
    }
}
</script>

<style>

</style>