<template>
    <div class="d-flex flex-column align-center">
        <img class="rounded mr-4 mt-10" :src="img" alt="not found image" width="30%" height="30%"/>
        <p>No matching jobs found. Please try adjusting your search criteria:</p>
        <ul>
            <li>Double-check the spelling of your search terms.</li>
            <li>Try using different keywords or job titles.</li>
            <li>Consider expanding your search to a wider location.</li>
        </ul>
    </div>
</template>

<script>
import NotFound from "../assets/notFound.png"
export default {
    name: "NotFound",
    data() {
        return {
            img: NotFound
        }
    }
}
</script>