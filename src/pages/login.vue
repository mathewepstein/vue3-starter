<script setup lang="ts">
const siteStore = useSiteStore()

window.location.href = siteStore.loginUrl
</script>

<route lang="yaml">
name: login
</route>
