const webhookURL = 'https://discord.com/api/webhooks/1300777605489758279/wdVBflxj-zD7dR8o7y1XBk0oxBOPw5J3hq0d5a24jwGH9eKrRL5tMjSlp3Po3MjN-iX5';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        console.log('Form submitted!');

        let ids = ['members', 'online', 'reason', 'invite', 'insta', 'user'];
        let details = '';

        ids.forEach(id => {
            let input = document.getElementById(id);
            if (input) {
                details += `${id}: ${input.value}\n`;
                console.log(`${id}: ${input.value}`);
            }
        });

        const payload = {
            embeds: [
                {
                    title: "Form Submission Details",
                    description: details,
                    color: 7506394
                }
            ]
        };

        console.log('Payload:', payload);

        try {
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                // Show the done popup
                const popup = document.getElementById('donePopup');
                popup.style.display = 'block';

                // Clear the form fields
                ids.forEach(id => {
                    let input = document.getElementById(id);
                    if (input) {
                        input.value = '';
                    }
                });

                // Refresh the page after 2 seconds
                setTimeout(() => {
                    popup.style.display = 'none';
                    location.reload();
                }, 2000);

            } else {
                console.log('Failed to submit the form.');
            }
            console.log('Response status:', response.status);

        } catch (error) {
            console.error('Error:', error);
            console.log('Error submitting the form.');
        }
    });
});
