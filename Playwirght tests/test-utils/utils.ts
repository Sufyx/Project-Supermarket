/**
 * 
 */


export function getRandomBirthDate(): string {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    const randomTimestamp = Math.random() * maxDate.getTime();
    const randomDate = new Date(randomTimestamp);
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const day = String(randomDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getRandomPhoneNumber() {
    const length = Math.floor(Math.random() * 11) + 6;
    let phoneNumber = '';
    const digits = '0123456789';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        phoneNumber += digits.charAt(randomIndex);
    }
    return phoneNumber;
}
