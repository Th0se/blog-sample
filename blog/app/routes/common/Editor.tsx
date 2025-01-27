/** @format */

import { FunctionComponent, Dispatch } from 'react';
import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react';
// eslint-disable-next-line import/no-named-as-default
import StarterKit from '@tiptap/starter-kit';

import './Editor.css';

const Editor: FunctionComponent<{
    content: string;
    setContent: Dispatch<React.SetStateAction<string>>;
}> = ({ content, setContent }) => {
    // Initialise Tiptap
    const extensions = [StarterKit];
    const editor = useEditor({
        extensions,
        content,
        onUpdate({ editor }) {
            const inner = editor.getHTML();
            setContent(inner);
        },
    });

    if (!editor) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='bg-neutral p-4 border border-accent'>
                <EditorContent editor={editor} />
                <BubbleMenu
                    editor={editor}
                    tippyOptions={{ duration: 100 }}
                    className='editor_menu'
                >
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                        className='editor_button'
                    >
                        <strong>B</strong>
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                        className='editor_button'
                    >
                        <em>I</em>
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                        className='editor_button'
                    >
                        <del>S</del>
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleCode().run()
                        }
                        className='editor_button'
                    >
                        <code>⎱</code>
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBlockquote().run()
                        }
                        className='editor_button'
                    >
                        <q>“”</q>
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                        className='editor_button'
                    >
                        •
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                        className='editor_button'
                    >
                        1.
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleCodeBlock().run()
                        }
                        className='editor_button'
                    >
                        ⌘
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().setParagraph().run()
                        }
                        className='editor_button'
                    >
                        ¶
                    </button>
                    <button
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 1 })
                                .run()
                        }
                        className='editor_button'
                    >
                        H1
                    </button>
                    <button
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 2 })
                                .run()
                        }
                        className='editor_button'
                    >
                        H2
                    </button>
                    <button
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 3 })
                                .run()
                        }
                        className='editor_button'
                    >
                        H3
                    </button>
                    <button
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 4 })
                                .run()
                        }
                        className='editor_button'
                    >
                        H4
                    </button>
                    <button
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 5 })
                                .run()
                        }
                        className='editor_button'
                    >
                        H5
                    </button>
                    <button
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 6 })
                                .run()
                        }
                        className='editor_button'
                    >
                        H6
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().setHorizontalRule().run()
                        }
                        className='editor_button'
                    >
                        —
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().setHardBreak().run()
                        }
                        className='editor_button'
                    >
                        ↵
                    </button>
                </BubbleMenu>
            </div>
        );
    }
};

export default Editor;

// Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
