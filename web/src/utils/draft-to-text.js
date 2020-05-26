
export default function draftToText(rawState){
    const blocks = rawState.blocks;
    const text = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');

    return text;
}       