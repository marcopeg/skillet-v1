import { gql, useMutation } from "@apollo/client";

const UPSERT_ENTRY = gql`
  mutation upsertEntry(
    $project_id: String!
    $prop_value_id: Int!
    $res_value_id: Int!
    $value: smallint!
  ) {
    insert_entries(
      objects: {
        project_id: $project_id
        prop_value_id: $prop_value_id
        res_value_id: $res_value_id
        value: $value
      }
      on_conflict: { constraint: entries_pkey, update_columns: [value] }
    ) {
      affected_rows
    }
  }
`;

const useEntryUpsert = () => {
  const [upsertEntry] = useMutation(UPSERT_ENTRY);
  return {
    upsertEntry: (variables) => {
      console.log(variables);
      return upsertEntry({ variables })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  };
};

export default useEntryUpsert;
