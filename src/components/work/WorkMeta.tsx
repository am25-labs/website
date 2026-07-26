import type { Work } from "@/types/domain";
import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface WorkMetaProps {
  client?: Work["client"];
  campaign?: Work["campaign"];
  country?: Work["country"];
  creative?: Work["creative"];
  strategy?: Work["strategy"];
  lead_design?: Work["lead_design"];
  design?: Work["design"];
  copy?: Work["copy"];
  illustration?: Work["illustration"];
  animation?: Work["animation"];
  photo?: Work["photo"];
  develop?: Work["develop"];
  work_team?: Work["work_team"];
  disciplines?: Work["disciplines"] | string | null;
}

export default function WorkMeta({
  client,
  campaign,
  country,
  creative,
  strategy,
  lead_design,
  design,
  copy,
  illustration,
  animation,
  photo,
  develop,
  work_team,
  disciplines,
}: WorkMetaProps) {
  const items = [
    { label: "Client", value: client },
    { label: "Campaign", value: campaign },
    { label: "Country", value: country },
    { label: "Creative", value: creative },
    { label: "Strategy", value: strategy },
    { label: "Lead", value: lead_design },
    { label: "Design", value: design },
    { label: "Copy", value: copy },
    { label: "Illustration", value: illustration },
    { label: "Animation", value: animation },
    { label: "Photo", value: photo },
    { label: "Develop", value: develop },
    { label: "Team", value: work_team },
    {
      label: "Disciplines",
      value: Array.isArray(disciplines)
        ? disciplines.map((d) => d.title).join(", ")
        : disciplines,
    },
  ].filter((item) => item.value);

  if (items.length === 0) {
    return null;
  }

  return (
    <GridContainer className="my-0">
      <GridFour />
      <GridFour>
        <div className="col-span-full mt-4 mb-8">
          <Table>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.label}
                  className="group-data-[variant=yellow]:hover:bg-muted/10 group-data-[variant=light]:hover:bg-muted/10"
                >
                  <TableCell className="py-4 font-bold uppercase">
                    {item.label}
                  </TableCell>
                  <TableCell className="py-4">{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </GridFour>
    </GridContainer>
  );
}
