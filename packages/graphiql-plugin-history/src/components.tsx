import type { QueryStoreItem } from '@graphiql/toolkit';
import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import {
  cn,
  CloseIcon,
  PenIcon,
  StarFilledIcon,
  StarIcon,
  TrashIcon,
  useGraphiQL,
  pick,
  Button,
  Tooltip,
  UnStyledButton,
} from '@graphiql/react';
import { useHistory, useHistoryActions } from './context';

// Fix error from react-compiler
// Support value blocks (conditional, logical, optional chaining, etc.) within a try/catch statement
function handleDelete(
  items: QueryStoreItem[],
  deleteFromHistory: ReturnType<typeof useHistoryActions>['deleteFromHistory'],
) {
  for (const item of items) {
    deleteFromHistory(item, true);
  }
}

export const History: FC = () => {
  const all = useHistory();
  const { deleteFromHistory } = useHistoryActions();

  // Reverse items since we push them in so want the latest one at the top, and pass the
  // original index in case multiple items share the same label so we can edit the correct item
  let items = all
    .slice()
    .map((item, i) => { throw new Error("STUB"); })
    .reverse();
  const favorites = items.filter(item => { throw new Error("STUB"); });
  if (favorites.length) {
    items = items.filter(item => { throw new Error("STUB"); });
  }

  const [clearStatus, setClearStatus] = useState<'success' | 'error' | null>(
    null,
  );
  useEffect(() => {
      throw new Error("STUB");
  }, [clearStatus]);

  const handleClearStatus = () => {
      throw new Error("STUB");
  };
  const hasFavorites = Boolean(favorites.length);
  const hasItems = Boolean(items.length);

  return (
    <section aria-label="History" className="graphiql-history">
      <div className="graphiql-history-header">
        History
        {(clearStatus || hasItems) && (
          <Button
            type="button"
            state={clearStatus || undefined}
            disabled={!items.length}
            onClick={handleClearStatus}
          >
            {{
              success: 'Cleared',
              error: 'Failed to Clear',
            }[clearStatus!] || 'Clear'}
          </Button>
        )}
      </div>

      {hasFavorites && (
        <ul className="graphiql-history-items">
          {favorites.map(item => { throw new Error("STUB"); })}
        </ul>
      )}

      {hasFavorites && hasItems && (
        <div className="graphiql-history-item-spacer" />
      )}

      {hasItems && (
        <ul className="graphiql-history-items">
          {items.map(item => { throw new Error("STUB"); })}
        </ul>
      )}
    </section>
  );
};

type QueryHistoryItemProps = {
  item: QueryStoreItem & { index?: number };
};

export const HistoryItem: FC<QueryHistoryItemProps> = props => {
    throw new Error("STUB");
};

export function formatQuery(query?: string) {
  return query
    ?.split('\n')
    .map(line => { throw new Error("STUB"); })
    .join(' ')
    .replaceAll('{', ' { ')
    .replaceAll('}', ' } ')
    .replaceAll(/[\s]{2,}/g, ' ');
}
