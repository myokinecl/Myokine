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
          <strong key={index} className="font-bold text-[#1D2433]">
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
    <div className="space-y-6 text-[#1D2433]/90 leading-relaxed font-serif text-[18px] sm:text-[19px]">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case 'h1':
            return (
              <h1
                key={key}
                id={`h1-${index}`}
                className="font-display text-3xl sm:text-4xl text-[#1D2433] font-bold tracking-tight pt-8 pb-3"
              >
                {parseInlineStyles(block.lines.join(' '))}
              </h1>
            );
          case 'h2':
            return (
              <h2
                key={key}
                id={`h2-${index}`}
                className="font-display text-2xl sm:text-3xl text-[#1D2433] font-semibold tracking-tight pt-6 pb-2"
              >
                {parseInlineStyles(block.lines.join(' '))}
              </h2>
            );
          case 'h3':
            return (
              <h3
                key={key}
                id={`h3-${index}`}
                className="font-display text-xl sm:text-2xl text-[#1D2433] font-medium tracking-tight pt-4 pb-1 border-b border-[#E3E5E8]"
              >
                {parseInlineStyles(block.lines.join(' '))}
              </h3>
            );
          case 'h4':
            return (
              <h4
                key={key}
                id={`h4-${index}`}
                className="font-display text-lg sm:text-xl text-[#1D2433] font-medium tracking-tight pt-3 pb-1"
              >
                {parseInlineStyles(block.lines.join(' '))}
              </h4>
            );
          case 'blockquote':
            return (
              <blockquote
                key={key}
                className="border-l-[3px] border-[#1D2433] pl-5 py-1 my-5 italic font-serif text-[#1D2433]"
              >
                {parseInlineStyles(block.lines.join(' '))}
              </blockquote>
            );
          case 'ul':
            return (
              <ul key={key} className="list-disc pl-5 space-y-2 py-1">
                {block.lines.map((line, idx) => (
                  <li key={idx} className="pl-1 text-[#1D2433]/85">
                    {parseInlineStyles(line)}
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={key} className="list-decimal pl-5 space-y-2 py-1">
                {block.lines.map((line, idx) => (
                  <li key={idx} className="pl-1 text-[#1D2433]/85">
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
                className="leading-[1.75] text-[#1D2433]/90"
              >
                {parseInlineStyles(block.lines.join(' '))}
              </p>
            );
        }
      })}
    </div>
  );
}
