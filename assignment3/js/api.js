export async function loadContestants() {
    const response = await fetch("./data/contestants.json");
    return response.json();
}