/**
 * Returns an embed containing a title and description.
 * Includes the author's name.
 */

export default {
    message: "Er zijn weer aanpassingen",
    embed: {
        title: "test",
        description: "{{ commit.title }}",
        author: {
            name: "{{ commit.author.name }}"
        }
    },
    extras: [{
        title: "View All Changes",
        url: "{{ github.context.payload.compare }}"
    }]
}