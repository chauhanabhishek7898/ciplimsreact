export default function abc() {
    return <div>abc</div>
}
export function parseDateToString  (date)  {
    return ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
}
export function parseDateToStringSubmit (date){
    return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +  date.getDate());
}
export function parseTimeToStringSubmit (date) {
    return (date.getHours() + ":" + (date.getMinutes()));
}
