/*--------------
By jarsbe: https://gist.github.com/jarsbe/af55f3705add9d9ec34fd0cb25ef2f67
*/

// WARNING: DraftEntity.create will be deprecated soon!
// Please use "contentState.createEntity" instead.

import { EditorState, Modifier, Entity, SelectionState } from 'draft-js'
import linkifyIt from 'linkify-it'
import tlds from 'tlds'

const linkify = linkifyIt()

linkify.tlds(tlds)

const linkifyEditorState = (editorState) => {
  const contentState = editorState.getCurrentContent()
  const blocks = contentState.getBlockMap()

  let newContentState = contentState

  blocks.forEach((block) => {
    const plainText = block.getText()

    const addEntityToLink = (start, end) => {
      const existingEntityKey = block.getEntityAt(start)
      if (existingEntityKey) {
        // avoid manipulation in case the link already has an entity
        const entity = Entity.get(existingEntityKey)
        if (entity && entity.get('type') === 'link') {
          return
        }
      }

      const selection = SelectionState.createEmpty(block.getKey())
                                      .set('anchorOffset', start)
                                      .set('focusOffset', end)
      const linkText = plainText.substring(start, end)
      const contentStateWithEntity = contentState.createEntity('LINK', 'IMMUTABLE', { url: linkText })
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

      newContentState = Modifier.replaceText(
        newContentState,
        selection,
        linkText,
        null,
        entityKey,
      )
    }

    findLinks(block, addEntityToLink)
  })

  if (!newContentState.equals(contentState)) {
    return EditorState.push(
      editorState,
      newContentState,
      'convert-to-links',
    )
  }

  return editorState
}

const findLinks = (contentBlock, callback) => {
  const links = linkify.match(contentBlock.get('text'))
  if (typeof links !== 'undefined' && links !== null) {
    for (let i = 0; i < links.length; i++) {
      callback(links[i].index, links[i].lastIndex)
    }
  }
}

export default linkifyEditorState
