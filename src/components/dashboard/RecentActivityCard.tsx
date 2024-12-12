import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BorderBeam } from '../ui/border-beam';

function RecentActivityCard() {
  return (
    <Card className="w-full flex-grow relative overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base">Recent Activity</CardTitle>
        <CardDescription className="text-xs">Your activities</CardDescription>
      </CardHeader>
      <BorderBeam />
    </Card>
  );
}

export default RecentActivityCard;
