import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

interface ParsedBlock {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'ul' | 'ol' | 'blockquote';
  lines: string[];
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  const parseInlineStyles = (text: string) => {
    // Basic regex to support double asterisks for bolding: **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-bold text-[#0a0a0c]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const rawLines = content.split('\n');
  const blocks: ParsedBlock[] = [];
  let currentBlock: ParsedBlock | null = null;

  for (const line of rawLines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      currentBlock = null;
      continue;
    }

    // Check for Headers
    if (trimmed.startsWith('### ')) {
      currentBlock = { type: 'h3', lines: [trimmed.slice(4)] };
      blocks.push(currentBlock);
      currentBlock = null;
      continue;
    }
    if (trimmed.startsWith('#### ')) {
      currentBlock = { type: 'h4', lines: [trimmed.slice(5)] };
      blocks.push(currentBlock);
      currentBlock = null;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      currentBlock = { type: 'h2', lines: [trimmed.slice(3)] };
      blocks.push(currentBlock);
      currentBlock = null;
      continue;
    }
    if (trimmed.startsWith('# ')) {
      currentBlock = { type: 'h1', lines: [trimmed.slice(2)] };
      blocks.push(currentBlock);
      currentBlock = null;
      continue;
    }

    // Check for Blockquote
    if (trimmed.startsWith('> ')) {
      const text = trimmed.slice(2).trim();
      if (currentBlock && currentBlock.type === 'blockquote') {
        currentBlock.lines.push(text);
      } else {
        currentBlock = { type: 'blockquote', lines: [text] };
        blocks.push(currentBlock);
      }
      continue;
    }

    // Check for Bullet List
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const text = trimmed.slice(2).trim();
      if (currentBlock && currentBlock.type === 'ul') {
        currentBlock.lines.push(text);
      } else {
        currentBlock = { type: 'ul', lines: [text] };
        blocks.push(currentBlock);
      }
      continue;
    }

    // Check for Ordered List
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      const text = olMatch[2].trim();
      if (currentBlock && currentBlock.type === 'ol') {
        currentBlock.lines.push(text);
      } else {
        currentBlock = { type: 'ol', lines: [text] };
        blocks.push(currentBlock);
      }
      continue;
    }

    // Default Paragraph
    if (currentBlock && currentBlock.type === 'p') {
      currentBlock.lines.push(trimmed);
    } else {
      currentBlock = { type: 'p', lines: [trimmed] };
      blocks.push(currentBlock);
    }
  }

  return (
    <div className="space-y-6 text-[#0a0a0c]/90 leading-relaxed font-sans text-base sm:text-lg">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case 'h1':
            return (
              <h1
                key={key}
                id={`h1-${index}`}
                className="font-serif text-3xl sm:text-4xl text-[#0a0a0c] font-bold tracking-tight pt-8 pb-3"
              >
                {parseInlineStyles(block.lines.join(' '))}
              </h1>
            );
          case 'h2':
            return (
              <h2
                key={key}
                id={`h2-${index}`}
                className="font-serif text-2xl sm:text-3xl text-[#0a0a0c] font-semibold tracking-tight pt-6 pb-2"
              >
                {parseInlineStyles(block.lines.join(' '))}
              </h2>
            );
          case 'h3':
            return (
              <h3
                key={key}
                id={`h3-${index}`}
                className="font-serif text-xl sm:text-2xl text-[#0a0a0c] font-medium tracking-tight pt-4 pb-1 border-b border-[#8b3a2a]/10"
              >
                {parseInlineStyles(block.lines.join(' '))}
              </h3>
            );
          case 'h4':
            return (
              <h4
                key={key}
                id={`h4-${index}`}
                className="font-serif text-lg sm:text-xl text-[#0a0a0c] font-medium tracking-tight pt-3 pb-1"
              >
                {parseInlineStyles(block.lines.join(' '))}
              </h4>
            );
          case 'blockquote':
            return (
              <blockquote
                key={key}
                className="border-l-2 border-[#8b3a2a]/60 pl-4 py-1.5 my-4 italic font-serif text-[#8b3a2a] bg-[#8b3a2a]/[0.03]"
              >
                {parseInlineStyles(block.lines.join(' '))}
              </blockquote>
            );
          case 'ul':
            return (
              <ul key={key} className="list-disc pl-5 space-y-2 py-1">
                {block.lines.map((line, idx) => (
                  <li key={idx} className="pl-1 text-[#0a0a0c]/85">
                    {parseInlineStyles(line)}
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={key} className="list-decimal pl-5 space-y-2 py-1">
                {block.lines.map((line, idx) => (
                  <li key={idx} className="pl-1 text-[#0a0a0c]/85">
                    {parseInlineStyles(line)}
                  </li>
                ))}
              </ol>
            );
          case 'p':
          default:
            return (
              <p
                key={key}
                className="leading-[1.8] text-justify text-[#0a0a0c]/85 text-base sm:text-[17px]"
              >
                {parseInlineStyles(block.lines.join(' '))}
              </p>
            );
        }
      })}
    </div>
  );
}
